package com.voting.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;


import javax.persistence.*;
import java.util.List;

@Entity @Table(name = "Voting")
@Getter @Setter
public class Voting extends BaseEntity {
    private String name;
    private String link;
    @ElementCollection private List<Vote> votes;
}
