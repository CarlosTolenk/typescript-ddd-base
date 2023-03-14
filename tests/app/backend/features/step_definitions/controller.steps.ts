import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, Before } from 'cucumber';
import request from 'supertest';

import { BackendApp } from '../../../../../src/app/backend/BackendApp';
import { EnvironmentArranger } from '../../../../Modules/Shared/infrastructure/arranger/EnvironmentArranger';
import container from '../../../../../src/app/backend/dependency-injection';

let _request: request.Test;
let application: BackendApp;
let _response: request.Response;
let environmentArranger: EnvironmentArranger;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer)
    .put(route)
    .send(JSON.parse(body) as object);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response content should be:', response => {
  assert.deepStrictEqual(_response.body, JSON.parse(response));
});

BeforeAll(async () => {
  environmentArranger = await container.get<Promise<EnvironmentArranger>>('Shared.EnvironmentArranger');
  await environmentArranger.arrange();

  application = new BackendApp();
  await application.start();
});

Before(async () => {
  await environmentArranger.arrange();
});

AfterAll(async () => {
  await environmentArranger.close();

  await application.stop();
});
