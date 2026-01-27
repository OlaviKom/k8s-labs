# Todo App

## requirements

- Google kubernetes Engine GKE cluster
- Google Artifact Registery for images
- GitHub repository where are next secrets:
  - POSTGRES_USER
  - POSTGRES_PASSWORD
  - GKE_PROJECT
  - GKE_SA_KEY

## Deploy

- Create GKE cluster and Artifact Registery
- Create secrets
- Run main.yaml GitHub Action

# Exercise 3.9

DBaas vs DIY

Do a pros/cons comparison of the solutions in terms of meaningful differences. This includes at least the required work and costs to initialize as well as the maintenance. Backup methods and their ease of usage should be considered as well.

## Required work and cost to initialize

### DBaaS

Can be less work than a DIY solution. The service provider's initialize database according customers requirements. Initialize is limited to the service provider's offering. Depending on the service provider, initializing may be free of charge. Usually, customers pay for the service based on how much they use it.

### DIY

Can be more work than a DBaas solution. Database initialization is implemented independently, providing greater freedom and opportunities to implement the solution that is required. You need a developer to do the initializing, so the cost depends on how long it takes.

## Required work and cost to maintenance

### DBaaS

The service provider handles maintenance and monitoring. Effortless solution for the user. Depending on the service provider, maintenance may be free of charge. Usually, customers pay for the service based on how much they use it.

### DIY

You have to handle maintenance and monitoring by yourself. More work than with a DBaaS solution, but you have control. Someone has to take care of maintenance, so it costs as much as the time it takes. However, normal operating costs may be lower than in DBaas.

## Backup methods

### DBaaS

The service provider takes care of backing up databases as part of the service. Effortless solution for the user. Backup services may be additional fee. Backup methdo can be example snapshot from datebase or point-in-time recovery (PITR).

### DIY

You have to take care of backing up databases by yourself. More work for you. It cost that much what it takes to make system to for backups. There can be example cronjob which takes automaticly backups from datebase at certain time. Example there can be done physical backup from database to another disk or take a snapshot about database.
