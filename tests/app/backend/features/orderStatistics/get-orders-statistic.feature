Feature: Obtain the total number of orders
  In order to have a orders statistic
  As a user
  I want to see the orders statistic

  Scenario: With one order
    Given I send an event to the event bus:
    """
    {
      "data": {
        "id": "a246f68b-6451-455f-b029-db5ea0e63a1c",
        "type": "order.created",
        "occurred_on": "2023-03-08T08:37:32+00:00",
        "aggregateId": "01867b99-93ec-42ba-86a6-7f305e972aa6",
        "attributes": {
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
    """
