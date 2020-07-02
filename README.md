# getting-started-with-cypress

This guide will help you get started with end to end testing with Cypress.

It has 3 parts:

* [Setting up Cypress](#setting-up-cypress) (coming soon)
* [Using Cypress](#using-cypress)
* [Integrating Cypress in Azure DevOps](#integrating-cypress-in-azure-devops) (coming soon)

## Setting up Cypress (Coming Soon)

How to get from an empty folder to a working installation of Cypress

## Using Cypress

[Cypress Tutorial](tutorial/using-cypress/index.md)

The using cypress tutorial will give a quick walk through of

* Why E2E Testing
* Problems with E2E Testing
* Filling in forms using Cypress
* Navigation using Cypress
* Faking APIs using Cypress
* Check information on a screen using Cypress
* TDD with Cypress

In order to get started more easily, this reposiotry includes a working base Cypress setup that we can use to run through the getting started portion without installing it from scratch.

This instalation is set up to use uses Typescript files.

## Integrating Cypress in Azure DevOps (Coming Soon)

Using a test suite is awesome when developing, to make sure that we are really making what we think we are making.

But what about when we are finished developing? When we need to ensure that it works everywhere, not only on my machine?

I use Azure DevOps for my pipelines to deploy most of my code.

in this section we'll create a release pipeline section that runs our checks for us, to make sure that after each deploy, the code is behaving as we expect it to!
