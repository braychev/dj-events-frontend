import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

const SearchPage = ({ events }) => {
    const router = useRouter();
    return (
        <Layout title="Search Results">
            <Link href="/events">Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}
        </Layout>
    );
};

export default SearchPage;

export const getServerSideProps = async ({ query: { term } }) => {
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers: term },
                { description: term },
                { venue: term },
            ],
        },
    });
    const res = await fetch(`${API_URL}/events?${query}`);
    const events = await res.json();

    return {
        props: { events },
    };
};
