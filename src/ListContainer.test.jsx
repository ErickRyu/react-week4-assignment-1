import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  it("tasks가 없을 경우, '할 일이 없어요!' 텍스트가 보인다.", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        tasks: [],
      }),
    );
    const { getByText } = render(<ListContainer />);
    expect(getByText('할 일이 없어요!')).not.toBeNull();
  });

  it('기존에 등록되어있는 task가 있다.', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        tasks: [
          { id: 1, title: 'Task-1' },
          { id: 2, title: 'Task-2' },
        ],
      }),
    );
    const { getByText } = render(<ListContainer />);
    expect(getByText('Task-1')).not.toBeNull();
    expect(getByText('Task-2')).not.toBeNull();
  });

  it("'완료'버튼 2개가 있다.", () => {
    useSelector.mockImplementation((selector) =>
      selector({
        tasks: [
          { id: 1, title: 'Task-1' },
          { id: 2, title: 'Task-2' },
        ],
      }),
    );
    const { getAllByText } = render(<ListContainer />);
    expect(getAllByText('완료')).toHaveLength(2);
  });
});
