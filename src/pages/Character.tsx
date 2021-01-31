import { useQuery } from '@apollo/client';
import { Header, Box, Button, Text, Image, Card, CardBody, ResponsiveContext } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import React, { FunctionComponent } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { GET_CHARACTER } from '../graphql/queries';

const Character: FunctionComponent = () => {
  const { id } = useParams() as Record<string, unknown>;
  const history = useHistory();
  const { loading, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });
  const { name, species, status, origin, location, image } = data?.character ?? {};
  return <>
    <Header background='brand'>
      <Box direction='row'>
        <Button icon={<LinkPrevious />} hoverIndicator onClick={() => history.goBack()} />
        <Box alignSelf='center' direction='row' flex='grow' justify='center'>
          <Text size='xlarge'>{name}</Text>
        </Box>
      </Box>
    </Header>
    <ResponsiveContext.Consumer>
      {(size) => {
        if (loading) return <><p>Loading ...</p></>;
        return <Box direction="row" justify='center' margin={size}>
          <Card height={size === 'small' ? 'large' : 'medium'} width={size === 'small' ? 'medium' : 'large'} background='light-1'>
            <CardBody pad='none'>
              <Box direction={size === 'small' ? 'column' : 'row'}>
                <Box direction='row'>
                  <Box>
                    <Image
                      alignSelf='start'
                      fill='horizontal'
                      src={image}
                    />
                  </Box>
                </Box>
                <Box margin='medium'>
                  <Text weight='bold'>Species: </Text>
                  <Text >{species}</Text>
                  <Text>&nbsp;</Text>
                  <Text weight='bold'>Status: </Text>
                  <Box direction='row' alignContent='center'>
                    <Text size='xxlarge' color={status === 'Alive' ? 'green' : 'red'} style={{ lineHeight: '24px' }}>•&nbsp;</Text>
                    <Text>{status}</Text>
                  </Box>
                  <Text>&nbsp;</Text>
                  <Text weight='bold'>Origin: </Text>
                  <Text>{origin?.name}</Text>
                  <Text>&nbsp;</Text>
                  <Text weight='bold'>Last known location: </Text>
                  <Text>{location?.name}</Text>
                </Box>
              </Box>
            </CardBody>
          </Card>
        </Box>
      }}
    </ResponsiveContext.Consumer>
  </>
}

export default Character