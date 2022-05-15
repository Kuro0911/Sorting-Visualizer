import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>SortViz</a>
        </h1>

        <p className={styles.description}>
          Get started by choosing the{" "}
          <code className={styles.code}>Sorting Algorithm</code>
        </p>

        <div className={styles.grid}>
          <Link href="/select-sort">
            <a className={styles.card}>
              <h2>Selection Sort &rarr;</h2>
              <p>
                The <b>selection sort</b> algorithm sorts an array by repeatedly
                finding the minimum element from unsorted part and putting it at
                the beginning
              </p>
            </a>
          </Link>
          <Link href="/bubble-sort">
            <a className={styles.card}>
              <h2>Bubble Sort &rarr;</h2>
              <p>
                <b>Bubble Sort</b> works by repeatedly swapping the adjacent
                elements if they are in the wrong order
              </p>
            </a>
          </Link>
          <Link href="/insert-sort">
            <a className={styles.card}>
              <h2>Insertion Sort &rarr;</h2>
              <p>
                <b>Insertion Sort</b> splits the array into a sorted and an
                unsorted part. Values from the unsorted part are picked and
                placed at the correct position in the sorted part
              </p>
            </a>
          </Link>
          <Link href="/quick-sort">
            <a className={styles.card}>
              <h2>Quick Sort &rarr;</h2>
              <p>
                <b>QuickSort</b> is a Divide and Conquer algorithm. It picks an
                element as pivot and partitions the given array around the
                picked pivot
              </p>
            </a>
          </Link>
          <Link href="/merge-sort">
            <a className={styles.card}>
              <h2>Merge Sort &rarr;</h2>
              <p>
                <b>Merge Sort</b> divides the input array into two halves, calls
                itself for the two halves, and then it merges the two sorted
                halves.
              </p>
            </a>
          </Link>
          <Link href="/heap-sort">
            <a className={styles.card}>
              <h2>Heap sort &rarr;</h2>
              <p>
                <b>Heap sort</b> is a comparison-based sorting technique based
                on Binary Heap data structure we first find the minimum element
                and place the minimum element at the beginning
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
