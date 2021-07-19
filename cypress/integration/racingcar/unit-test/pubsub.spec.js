/// <reference types="cypress" />

import PubSub from '../../../../src/js/racingcar/PubSub.js';

const pubsub = new PubSub();

describe('test pubsub', () => {
	it('test 이벤트를 발생하면 인자로 주어진 숫자+1 만큼 publish 함수를 호출한다.', () => {
		cy.spy(pubsub, 'publish').as('spy');

		const callback = (n) => {
			if (n) {
				setTimeout(() => {
					pubsub.publish('test', n - 1);
				}, 10);
			}
		};

		pubsub.subscribe('test', callback);
		pubsub.publish('test', 3);

		//eventloop에 들어가는 함수까지 전부 다 추적 가능한 방법
		cy.get('@spy').should('have.been.called', 4);
	});
});
