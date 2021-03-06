package com.voting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class FrontController {

    /**
     * @return Special controller, that redirect user to main page
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getMainPage() {
        return "/index.html";
    }
}
