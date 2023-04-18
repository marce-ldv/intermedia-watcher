Feature: Create a new coin
  In order to have coins in the platform
  As a user with admin permissions
  I want to create a new coin

  Scenario: A valid non existing coin
    Given I send a PUT request to "/coins/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "name": "The best coin",
    }
    """
    Then the response status code should be 201
    And the response should be empty
