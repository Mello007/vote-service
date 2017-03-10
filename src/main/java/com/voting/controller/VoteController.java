package com.voting.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "vote")
public class VoteController {

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public void addVote(@RequestBody String name){

    }
}
