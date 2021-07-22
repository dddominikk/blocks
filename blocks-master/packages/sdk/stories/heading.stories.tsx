import React from 'react';
import {storiesOf} from '@storybook/react';
import Heading from '../src/ui/heading';
import theme from '../src/ui/theme/default_theme';
import {keys, has} from '../src/private_utils';
import {allStylesPropTypes} from '../src/ui/system';
import Example from './helpers/example';
import {createJsxPropsStringFromValuesMap} from './helpers/code_utils';

const stories = storiesOf('Heading', module);

function HeadingExample() {
    return (
        <Example
            options={{
                variant: {
                    type: 'selectButtons',
                    label: 'Variant',
                    options: keys(theme.headingStyles),
                },
                size: {
                    type: 'select',
                    label: 'Size',
                    options: keys(theme.headingStyles.default),
                },
                textColor: {
                    type: 'selectButtons',
                    label: 'Text color',
                    options: ['default', 'light'],
                },
            }}
            styleProps={Object.keys(allStylesPropTypes)}
            renderCodeFn={values => {
                const props = createJsxPropsStringFromValuesMap(values);
                let sizeOutOfBoundsComment;
                if (values.variant === 'caps' && !has(theme.headingStyles.caps, values.size)) {
                    sizeOutOfBoundsComment = `// The caps variant only supports ${keys(
                        theme.headingStyles.caps,
                    ).join(', ')}. It will use the default size otherwise.`;
                } else {
                    sizeOutOfBoundsComment = '';
                }
                return `
                    import {Heading} from '@airtable/blocks/ui';
                    
                    ${sizeOutOfBoundsComment}
                    const headingExample = (
                        <Heading ${props}>The brown fox jumped over the lazy dog</Heading>
                    );
                `;
            }}
        >
            {values => <Heading {...values}>The brown fox jumped over the lazy dog</Heading>}
        </Example>
    );
}

stories.add('example', () => <HeadingExample />);

stories.add('as', () => (
    <React.Fragment>
        {[
            'h1' as const,
            'h2' as const,
            'h3' as const,
            'h4' as const,
            'h5' as const,
            'h6' as const,
        ].map(as => (
            <Heading key={as} as={as}>
                {as}
            </Heading>
        ))}
    </React.Fragment>
));

stories.add('ref', () => (
    <React.Fragment>
        <Heading
            ref={node => {
                // eslint-disable-next-line no-console
                console.log(node);
            }}
        >
            Look into your console to see the ref
        </Heading>
    </React.Fragment>
));

stories.add('custom className', () => (
    <React.Fragment>
        <Heading className="user-provided-class">Inspect element to see class name</Heading>
    </React.Fragment>
));

stories.add('id attribute', () => (
    <React.Fragment>
        <Heading id="my-id">Inspect element to see id</Heading>
    </React.Fragment>
));

stories.add('style attribute', () => (
    <React.Fragment>
        <Heading
            style={{
                transform: 'scale(0.95)',
            }}
        >
            Inspect element to see style attribute
        </Heading>
    </React.Fragment>
));

stories.add('data attributes', () => (
    <React.Fragment>
        <Heading
            dataAttributes={{
                'data-something': true,
                'data-other': 'string value',
            }}
        >
            Inspect element to see data attributes
        </Heading>
    </React.Fragment>
));

stories.add('role attribute', () => (
    <React.Fragment>
        <Heading role="nav">Inspect element to see role attribute</Heading>
    </React.Fragment>
));

stories.add('aria attributes', () => (
    <React.Fragment>
        <Heading
            aria-label="__label__"
            aria-labelledby="__id__"
            aria-describedby="__id__"
            aria-controls="__id__"
            aria-expanded={false}
            aria-haspopup={false}
            aria-hidden={false}
            aria-live="off"
        >
            Inspect element to see aria attributes
        </Heading>
    </React.Fragment>
));
