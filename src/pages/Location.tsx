import { useQuery } from '@apollo/client';
import { Box, Button, Grid, Header, ResponsiveContext, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import React, { FunctionComponent, useEffect, useState } from 'react';
import ResidentCard from '../components/ResidentCard';
import { locationIdVar } from '../graphql/client';

// graphql
import { GET_LOCATION, GET_LOCATION_COUNT } from '../graphql/queries';

const Location: FunctionComponent = () => {
  const [locationId, setlocationId] = useState<number | undefined>(locationIdVar())
  
  const { loading: locationCountLoading, data: locationCountData } = useQuery(GET_LOCATION_COUNT, {
    skip: !!locationId
  });

  useEffect(() => {
    if (!locationCountLoading && !!locationCountData?.locations?.info?.count) {
      locationIdVar(Math.floor(Math.random() * Math.floor(locationCountData.locations.info.count)) + 1)
      setlocationId(locationIdVar())
    }
  }, [locationCountData, locationCountLoading])

  const { loading: locationLoading, data: locationData } = useQuery(GET_LOCATION, {
    variables: { id: locationId },
    skip: !locationId
  });

  return <>
    <Header background='brand'>
      <Box direction='row'>
        <Button icon={<Refresh />} hoverIndicator onClick={() => setlocationId(undefined)}/>
        <Box alignSelf='center' direction='row' flex='grow' justify='center'>
          <Text size='xlarge'>{locationData?.location?.name}</Text>
        </Box>
      </Box>
    </Header>

    <ResponsiveContext.Consumer>
      {(size) => {
        const columns: Record<string, string[]> = {
          small: ['30vw', '30vw'],
          medium: ['30vw', '30vw'],
          large: ['small', 'small', 'small', 'small'],
        };
        if (locationLoading || locationCountLoading) return <><p>Loading ...</p></>;
        if (!locationLoading && 
            !locationData?.location?.residents?.filter((resident: Record<string, unknown>) => 
              !!resident.id).length) return <><p>No residents found ...</p></>;
        return (<Box direction="row" justify='center' margin={size}>
          <Grid
            columns={columns[size]}
            gap='small'
          >
            {locationData?.location?.residents?.map(
              ({ id, name, image }: { id: number, name: string, image: string }) => <ResidentCard
                key={id}
                id={id}
                name={name}
                imageUri={image}
              />
            )}
          </Grid></Box>);
      }}
    </ResponsiveContext.Consumer>
  </>

}

export default Location