package com.voting.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;


import javax.persistence.*;
import java.util.List;

@Entity @Table(name = "Voting")
@Getter @Setter
public class Voting extends BaseEntity {
    private String name;
    private String link;
    @Type(type="true_false") private Boolean status;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true) private List<Vote> votes;
}
