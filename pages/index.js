import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

const HomePage = ({ events }) => {
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
            {events.length > 0 && (
                <Link href="/events">
                    <a className="btn-secondary">View All Events</a>
                </Link>
            )}
        </Layout>
    );
};

export default HomePage;

export const getStaticProps = async () => {
    const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
    const events = await res.json();

    return {
        props: { events },
        revalidate: 10,
    };
};
