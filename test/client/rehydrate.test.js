import { rehydrate } from '../../src/client/rehydrate';
import { rule, css, reset } from '../../src/index';
import { renderStatic } from '../../src/server/render-static';
import { renderedCache } from '../../src/core/rule-cache';

describe('rehydration', () => {
  test('rehydrates successfully', () => {
    const cn0 = rule`
      color: green;
    `;

    const cn1 = rule`
      color: blue;
      &:hover {
        color: red;
      }
    `;

    expect(css()).toBe(
      [
        '._dt1o82{color:green;}',
        '._awvwfy{color:blue;}',
        '._awvwfy:hover{color:red;}'
      ].join('')
    );

    // Render the above rules & grab the class names
    const { classes } = renderStatic();

    // Reset the inserted CSS/rules
    reset();
    expect(css()).toBe('');

    // Make sure we have nothing currently in our rendered cache
    expect(renderedCache).toEqual({});

    // Rehydrate!
    rehydrate(classes);

    // Now, we have the classes in the rendered class
    expect(renderedCache).toEqual({
      _dt1o82: true,
      _awvwfy: true
    });

    // We still shouldn't have any CSS inserted
    expect(css());

    const cn3 = rule`
      color: blue;
      &:hover {
        color: red;
      }
    `;

    const cn4 = rule`
      color: green;
    `;

    // And still, no CSS, since these rules are identical to
    // ones that were already rendered
    expect(css());
  });
});
