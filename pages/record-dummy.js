import Head from 'next/head';
import Layout from '../components/Layout';

/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return <input type="file" accept="audio/mp3" capture />;
}
