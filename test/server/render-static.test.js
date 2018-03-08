import { renderStatic } from '../../src/server/render-static';

describe('static rendering', () => {
  test('renders a style tag', () => {
    const ruleCache = {
      '.cls_0{color:green;}': 'cls_0',
      '.cls_1{color:blue;}': 'cls_1',
      '.cls_1:hover{color:red;}': 'cls_1'
    };

    const rendered = renderStatic(
      [
        '.cls_0{color:green;}',
        '.cls_1{color:blue;}',
        '.cls_1:hover{color:red;}'
      ],
      ruleCache
    );

    expect(rendered).toEqual(
      [
        '<style type="text/css" data-tstyle-rendered>',
        '/*~cls_0~*/.cls_0{color:green;}',
        '/*~*/',
        '/*~cls_1~*/.cls_1{color:blue;}',
        '/*~*/',
        '/*~cls_1~*/.cls_1:hover{color:red;}',
        '</style>'
      ].join('')
    );
  });
});
