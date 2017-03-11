package com.voting.repository;

import com.voting.entity.Vote;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource(collectionResourceRel = "vote", path = "vote")
public interface VoteRepository extends PagingAndSortingRepository<Vote, Long> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE vote SET count = count+1 WHERE name = ?", nativeQuery = true)
    void addPoint(@Param("name") String name);
}