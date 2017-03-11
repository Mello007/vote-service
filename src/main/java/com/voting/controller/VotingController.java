package com.voting.controller;

import com.voting.service.VotingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "voting")
public class VotingController {

    @Autowired VotingService votingService;

    @RequestMapping(value = "add", method = RequestMethod.POST, consumes = "application/json")
    public void addStructure(@RequestBody String json) throws Exception {
        votingService.addNewVoting(json);
    }
}
