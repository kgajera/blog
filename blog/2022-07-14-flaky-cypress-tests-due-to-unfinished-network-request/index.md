---
title: Flaky Cypress Tests and Network Requests
authors: [kgajera]
tags: [cypress]
---

There can be many potential causes for flaky [Cypress](https://www.cypress.io) tests and this can be a cause of frustration when it comes to testing. I recently upgraded a project to Cypress 10 and discovered one of the causes for flakiness was due to assertions running prematurely before network requests had completed. I assumed Cypress automagically handled waiting for requests to finish but that's not the case. So let's take a look at how to wait for network requests to finish before your assertions are run.

<!--truncate-->

## Example of a flaky test

Let's start by looking at a test that is flaky. We're testing a login page by doing the following:

- Navigate to the login page
- Fill out the input fields in the login form
- Click the form's submit button which will asynchronously send a POST request to the server to proccess the form submission
- We expect the login attempt to be unsuccessful due to invalid credentials, so an error message should be displayed

Here's the code for this test:

```ts
describe("login", () => {
  it("should display error message when email is not found", () => {
    // Navigate to login page
    cy.visit("/login");

    // Populate the "email" and "password" input fields in the login form
    cy.get('[data-test="email"]').type("doesnotexist@example.com");
    cy.get('[data-test="password"]').type("test1234");

    // Click the submit button. This submits the login form triggering an asynchronous network request.
    cy.get('[data-test="submit"]').click();

    // We are expecting this error message to be displayed in the UI
    cy.findByText("Email does not exist").should("exist");
  });
});
```

This test passes more often than not, but why is it flaky?

Cypress by default waits 5 seconds for requests to finish before executing the next command. A list of all the default timeout values can be found here: https://docs.cypress.io/guides/references/configuration#Timeouts

In our case, the assertion to check for the "Email does not exist" error message was executing before the POST request finished. To fix this, we need to [wait](https://docs.cypress.io/api/commands/wait) for our request to finish before moving on to the next command.

## How to wait for network requests to finish

To wait for our request to finish, we will be utilizing the following Cypress commands:

- [`intercept`](https://docs.cypress.io/api/commands/intercept) - to spy on the HTTP request
  - We will give the intercepted request an alias using the [`as`](https://docs.cypress.io/api/commands/as) command so we can reference it later
- [`wait`](https://docs.cypress.io/api/commands/wait) - to wait for the intercepted request before executing the next command

Here's a new version of our test using this approach:

```ts
describe("login", () => {
  it("should display error message when email is not found", () => {
    // Navigate to login page
    cy.visit("/login");

    // Intercept the network request
    cy.intercept("POST", "/api/graphql") // The HTTP method and URL to be intercepted
      .as("loginMutation"); // Specify an alias for the request so we can reference it later

    // Populate the "email" and "password" input fields in the login form
    cy.get('[data-test="email"]').type("doesnotexist@example.com");
    cy.get('[data-test="password"]').type("test1234");

    // Click the submit button. This submits the login form triggering an AJAX request.
    cy.get('[data-test="submit"]').click();

    // Wait for the request to finish by specifing the alias for our intercepted request
    cy.wait("@loginMutation");

    // We are expecting this error message to be displayed in the UI
    cy.findByText("Email does not exist").should("exist");
  });
});
```

This ensures our assertion to find the error message runs after the POST request has has completed so it's no longer flaky!

If you're using GraphQL, I would recommend checking out Cypress' docs for strategies to alias requests: https://docs.cypress.io/guides/end-to-end-testing/working-with-graphql
