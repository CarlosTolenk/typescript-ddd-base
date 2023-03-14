Feature: Obtain the total number of orders
  In order to have a orders statistic
  As a user
  I want to see the orders statistic

  Scenario: With one order
    Given I send an event to the event bus:
    """
    {
      "data": {
        "id": "c77fa036-cbc7-4414-996b-c6a7a93cae09",
        "type": "order.created",
        "occurred_on": "2023-03-08T08:37:32+00:00",
        "attributes": {
          "id": "8c900b20-e04a-4777-9183-32faab6d2fb5",
          "amount": 450,
          "description": "new order"
        },
        "meta" : {
          "host": "111.26.06.93"
        }
      }
    }
    """
    When I send a GET request to "/order-statistic"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "total": 1,
      "totalAmount": 450
    }
