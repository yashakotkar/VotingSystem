pragma solidity ^0.4.17;

contract Elections{
    struct Candidate{
        string name;
        string party;
        string qualification;
        uint age;
        uint voteCount;
        mapping(address => bool) votes;
    }
    
    Candidate[] public candidates;
    uint public winner;
    uint public voterCount;
    
    bool public start;
    bool public end;
    bool public winnerPicked;
    mapping(address => bool) public voted;
    
    address private admin;
    mapping(string=>bool) private registeredCandidates;
    mapping(address => bool) private voters;
    
        
    //function Elections(uint min) public{
    constructor() public {
        admin = msg.sender;
        voterCount = 0;
        start = false;
        end = false;
    }
    
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }
    
    function candidateRegistration(string name,string party,string qualification, uint age) public {
        require(!start && !end);
        require(age > 24);
        require(!registeredCandidates[name]);
        Candidate memory newCandidate = Candidate({
            name:name,
            party: party,
            voteCount:0,
            qualification:qualification,
            age: age
        });
        candidates.push(newCandidate);
        registeredCandidates[name] = true;
        voterCount++;
    }
    
    function voterRegistration(address voter) public {
        require(!start && !end);
        require(!voters[voter]);
        voters[msg.sender] = true;
        voterCount++;
    }
    
    function vote(uint index) public {
        Candidate storage candidate = candidates[index];
        require(start && !end);
        require(voters[msg.sender]);
        require(!voted[msg.sender]);
        require(!candidate.votes[msg.sender]);
        
        candidate.votes[msg.sender] = true;
        candidate.voteCount++;
                
        voted[msg.sender] = true;
    }
    
    function startElection() public restricted{
        require(!start && !end);
        start = true;
    }
    
    function endElection() public restricted{
        require(start && !end);
        end = true;
    }
    
    function electionResults() public restricted {
        require(start && end);
        uint index = 0;
        uint mx = 0;
        for(uint i = 0; i < candidates.length ; i++){
            if(candidates[i].voteCount > mx){
                index = i;
                mx = candidates[i].voteCount;
            }
        }
        winner = index;
        winnerPicked = true;
    }
    
    function getCandidateCount() public view returns(uint) {
        return candidates.length;
    }
}