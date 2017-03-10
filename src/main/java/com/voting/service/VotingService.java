package com.voting.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.voting.entity.Vote;
import com.voting.entity.Voting;
import com.voting.repository.VotingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class VotingService {


    @Autowired VotingRepository votingRepository;


    @Transactional
    public void addNewVoting(String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(json);
        Voting voting = new Voting();
        voting.setName(jsonNode.findValue("name").textValue());
        List<Vote> voteList = new ArrayList<>();
        jsonNode.findValue("votes").elements().forEachRemaining(elem -> {
           Vote vote = new Vote();
           vote.setName(elem.textValue());
           vote.setCount("0");
           voteList.add(vote);
        });
        voting.setVotes(voteList);
        votingRepository.save(voting);
    }
}
