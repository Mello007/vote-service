package com.voting.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity @Table(name = "Vote")
@Getter @Setter
public class Vote extends BaseEntity {
    private String name;
    private String count;
}
