import { Card, CardFooter, CardBody, Image, Text } from 'grommet';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const ResidentCard: FunctionComponent<{ id: number, name: string, imageUri: string }> = ({ id, name, imageUri }) => {
  return <Link to={`/character/${id}`}>
    <Card height='small' width='small' background='light-1'>
      <CardBody pad='none'><Image
        fit='cover'
        src={imageUri}
      /></CardBody>
      <CardFooter pad='medium' align='center' margin='auto'>
        <Text>{name}</Text>
      </CardFooter>
    </Card>
  </Link>
}

export default ResidentCard