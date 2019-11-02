import { parseElement } from '../src/index';

test('testElement just tag', () => {
  let jsx = `
    <div>
      hello
    </div>
  `;
  expect(parseElement(jsx)).toEqual({
      type: 'element',
      props: {
        length: 0,
        props: {},
        type: 'props'
      },
      children: [],
      length: 9,
      name: 'div'
  });
});