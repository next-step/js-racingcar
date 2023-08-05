import { createMessageViewer } from '../../src/utils/createMessageViewer.js';

describe('createMesssageViewer 테스트', () => {
  it('message를 파라미터로 받는 MessageViewer를 반환한다', () => {
    const mockViewer = jest.fn();
    const messageViewer = createMessageViewer(mockViewer);
    const testMessage = 'test';

    messageViewer(testMessage);

    expect(mockViewer).toHaveBeenCalledWith(testMessage);
  });
});
