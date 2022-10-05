import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {
  return <MeetupList meetups={props.meetups}/>;
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://root:root@cluster0.z1xynly.mongodb.net/?retryWrites=true&w=majority'
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  };
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// };

export default HomePage;