import React from 'react';
import renderer from 'react-test-renderer';

import MemberCard from '..srccomponentMemberCard.js';

describe('<MemberCard />', () => {
  it('should match the snapshot', () => {
    const component = renderer.create(<MemberCard />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
