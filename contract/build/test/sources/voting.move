module my_addr::voting {
    use std::string::String;
    use std::signer;
    use aptos_std::table::{Self, Table};
    use aptos_std::vector;
    use aptos_framework::event;

    struct VotingData has key {
        votes: Table<address, u64>,
        names: Table<address, String>,
        registered: Table<address, bool>,
        candidates: vector<Candidate>,
        id_count: u64
    }

    struct Candidate has store, drop, copy {
        name: String,
        wallet: address,
        id_count: u64,
        count: u64
    }

    #[event]
    struct RegisterVoterEvent has drop, store {
        voter: address,
        name: String
    }

    #[event]
    struct RegisterCandidateEvent has drop, store {
        candidate: address,
        name: String,
        id: u64
    }

    #[event]
    struct VoteEvent has drop, store {
        voter: address,
        candidate_id: u64
    }


    // View candidates
    public fun view_candidates(addr: address): vector<Candidate> acquires VotingData {
        let voting_data = borrow_global<VotingData>(addr);
        *&voting_data.candidates
    }

    // Register as voter
    public entry fun register_as_voter(account: &signer, name: String) acquires VotingData {
        let addr = signer::address_of(account);
        let voting_data = borrow_global_mut<VotingData>(@my_addr);
        
        assert!(!table::contains(&voting_data.registered, addr), 1); // Already registered

        table::add(&mut voting_data.votes, addr, 1);
        table::add(&mut voting_data.names, addr, name);
        table::add(&mut voting_data.registered, addr, true);

        // Emit event
        event::emit(RegisterVoterEvent {
            voter: addr,
            name
        });
    }

    // Register as candidate
    public entry fun register_as_candidate(account: &signer, name: String) acquires VotingData {
        let addr = signer::address_of(account);
        let voting_data = borrow_global_mut<VotingData>(@my_addr);
        
        assert!(!table::contains(&voting_data.registered, addr), 1); // Already registered

        table::add(&mut voting_data.names, addr, name);
        table::add(&mut voting_data.votes, addr, 1);
        table::add(&mut voting_data.registered, addr, true);

        let candidate = Candidate {
            name,
            wallet: addr,
            id_count: voting_data.id_count,
            count: 0
        };
        vector::push_back(&mut voting_data.candidates, candidate);
        
        let id = voting_data.id_count;
        voting_data.id_count = voting_data.id_count + 1;

        // Emit event
        event::emit(RegisterCandidateEvent {
            candidate: addr,
            name,
            id
        });
    }

    // Vote for a candidate
    public entry fun vote(account: &signer, id: u64) acquires VotingData {
        let addr = signer::address_of(account);
        let voting_data = borrow_global_mut<VotingData>(@my_addr);
        
        assert!(table::contains(&voting_data.votes, addr), 2); // Not registered
        assert!(*table::borrow(&voting_data.votes, addr) > 0, 3); // No votes left
        assert!(id < vector::length(&voting_data.candidates), 4); // Invalid candidate ID

        let candidate = vector::borrow_mut(&mut voting_data.candidates, id);
        candidate.count = candidate.count + 1;
        
        let votes = table::borrow_mut(&mut voting_data.votes, addr);
        *votes = 0;

        // Emit event
        event::emit(VoteEvent {
            voter: addr,
            candidate_id: id
        });
    }

    #[test_only]
    use aptos_framework::account::create_account_for_test;

    #[test(creator = @my_addr)]
    fun test_voting_flow(creator: &signer) acquires VotingData {
        create_account_for_test(signer::address_of(creator));
        init_module(creator);

        // Test registering as voter
        register_as_voter(creator, string::utf8(b"Alice"));
        
        // Test registering as candidate
        let bob = create_account_for_test(@0x2);
        register_as_candidate(&bob, string::utf8(b"Bob"));
        
        // Test voting
        vote(creator, 0);
        
        // Verify results
        let candidates = view_candidates(signer::address_of(creator));
        let candidate = vector::borrow(&candidates, 0);
        assert!(candidate.count == 1, 5);
    }
}
