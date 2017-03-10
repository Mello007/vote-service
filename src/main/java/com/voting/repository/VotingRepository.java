package com.voting.repository;

import com.voting.entity.Voting;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

@RepositoryRestResource(collectionResourceRel = "voting", path = "voting")
public interface VotingRepository extends PagingAndSortingRepository<Voting, Long> {

    @Transactional
    void deleteByName(@Param("name") String name);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM voting", nativeQuery = true)
    void deleteAll();
}