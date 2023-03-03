Feature: Create a new order
  In order to have order in the platform
  As a user with admin permissions
  I want to create a new order

  Scenario: A valid non existing course
    Given I send a PUT request to "/order/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "id": "ef8ac118-8d7f-49cc-abec-78e0d05af80a",
      "amount": 1450
    }
    """
    Then the response status code should be 201
    And the response should be empty
