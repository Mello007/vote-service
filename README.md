# Application "Voting"

This is web-application, that able to:
```
1. Create and delete votes
2. Close and open votes
3. View statistics
4. Filter results
5. Search results
6. Generate link for the voting
```

## Quick start

```
1. You must have postgresql! Download it (version 9.5 or later) and create new database. 

2. Change the settings in file: src/main/resources/applications.yaml
In terminal, Navigate to the folder with project and write: 

3. mvn clean package

4. mvn spring-boot:run
```




### Prerequisites


```
spring boot
spring data jpa rest
java 8
maven 3
postgresql 9.5
bootstrap 3
jquery 1.9.1
```


### Screenshots

#### Add new voting:

![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/add%20new%20voting.png "Without sort")

#### View added voting:
![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/add%20new%20voting%20view.png "Without sort")


#### View statistics:

![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/view%20statistics.png "Without sort")


#### Without sort:

![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/without%20sort.png "Without sort")

#### After sort:

![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/after%20sort.png "Without sort")


#### Searching

![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/searching.png "Without sort")

#### Close voting

![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/close%20voting.png "Without sort")


#### What's wrong when voting is closed

![Alt text](https://raw.githubusercontent.com/Mello007/vote-service/master/screenshots/whats%20wrong%20when%20voting%20is%20closed.png "Without sort")

## Author

* **Artem Savich** - *Initial work* - [Mello007](https://github.com/Mello007)