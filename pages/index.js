import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const data = [
    {
      title: "Selection Sort",
      desc: "The <b>selection sort</b> algorithm sorts an array by repeatedly finding the minimum element from unsorted part and putting it at the beginning",
      link: "/select-sort",
    },
    {
      title: "Bubble Sort",
      desc: "<b>Bubble Sort</b> works by repeatedly swapping the adjacent elements if they are in the wrong order",
      link: "/bubble-sort",
    },
    {
      title: "Insertion Sort",
      desc: "<b>Insertion Sort</b> splits the array into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part",
      link: "/insert-sort",
    },
    {
      title: "Quick Sort",
      desc: "<b>QuickSort</b> is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot",
      link: "/quick-sort",
    },
    {
      title: "Merge Sort",
      desc: "<b>Merge Sort</b> divides the input array into two halves, calls itself for the two halves, and then it merges the two sorted halves.",
      link: "/merge-sort",
    },
    {
      title: "Heap Sort",
      desc: "<b>Heap sort</b> is a comparison-based sorting technique based on Binary Heap data structure",
      link: "/heap-sort",
    },
    {
      title: "Breath First Search",
      desc: "<b>Heap sort</b> is a comparison-based sorting technique based on Binary Heap data structure",
      link: "/heap-sort",
    },
    {
      title: "Depth first Search",
      desc: "<b>Heap sort</b> is a comparison-based sorting technique based on Binary Heap data structure",
      link: "/heap-sort",
    },
    {
      title: "A star algorithm",
      desc: "<b>Heap sort</b> is a comparison-based sorting technique based on Binary Heap data structure",
      link: "/heap-sort",
    },
  ];
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a
            onClick={() => {
              window.open("https://github.com/Kuro0911/Sorting-Visualizer");
            }}
          >
            AlgoViz
          </a>
        </h1>
        <p className={styles.description}>
          Get started by choosing an
          <code className={styles.code}>Algorithm</code>
        </p>
        <div className={styles.grid}>
          {data.map((e) => (
            <a className={styles.card} href={e.link}>
              <h2>{e.title} &rarr;</h2>
              <p dangerouslySetInnerHTML={{ __html: e.desc }}></p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
