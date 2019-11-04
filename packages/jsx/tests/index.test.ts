import { parseElement } from '../src/index';

test('testElement just tag', () => {
  let jsx = `
    <div placeholder="hello">
      hello
    </div>
  `;
  expect(parseElement(jsx)).toEqual({
      type: 'element',
      props: {
        length: 20,
        props: {
          placeholder: 'hello',
        },
        type: 'props'
      },
      children: [{
        length: 17,
        type: 'value',
        value: 'hello',
      }],
      length: 47,
      name: 'div'
  });
});

test.skip('testElement just more props', () => {
  let jsx = `
    <div placeholder="hello" alt="xxx'>
      hello
    </div>
  `;
  expect(parseElement(jsx)).toEqual({
      type: 'element',
      props: {
        length: 20,
        props: {
          placeholder: 'hello',
        },
        type: 'props'
      },
      children: [],
      length: 29,
      name: 'div'
  });
});


test('testElement self close', () => {
  let jsx = `
    <div placeholder="hello" />
  `;
  expect(parseElement(jsx)).toEqual({
      type: 'element',
      props: {
        length: 20,
        props: {
          placeholder: 'hello',
        },
        type: 'props'
      },
      children: [],
      length: 32,
      name: 'div'
  });
});

test.skip('testElement more children', () => {
  let jsx = `
    <div placeholder="hello">
      <div>hello</div>
      <div>hhh</div>
    </div>
  `;
  expect(parseElement(jsx)).toEqual({
      type: 'element',
      props: {
        length: 20,
        props: {
          placeholder: 'hello',
        },
        type: 'props'
      },
      children: [{
        type: 'element',

        
      }],
      length: 32,
      name: 'div'
  });
});