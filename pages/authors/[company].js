
import {
  connect,
  configure,
  reduxWrapper,
  Wrapper,
  WidgetPosts,
  TwoColsLayout as Section,
  WidgetPublisher
} from 'eventjuicer-site-components';

import Head from 'next/head'

import settings from '../../settings';

const PageCompany = ({company}) => {
  
return (
  <Wrapper first color="transparent">
  
    <Section
  left={
    <WidgetPosts company={company} label="posts.company" />
  }
  right={ <WidgetPublisher company={company} />}
  leftSize={7}
/>

  </Wrapper>
);

}

PageCompany.defaultProps = {
  company: {}
}


export async function getStaticPaths() {

  return {
  
    paths: [],
    fallback: "blocking" 
  };
   
}


export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {

  const {company} = props.params;
  const publisher = `publishers/${company}`
  await configure(props, {
    settings : settings,
    preload : [
      {
        resource: "posts",
        params: { company: company}
      },
      publisher
    ]
  })

  return {
      props : {
        company: company
      },
      revalidate : 30
  }

})





export default connect()(PageCompany);
