import "./sorting.css";
import React, { Component } from "react";
import BarsContainer from "./BarsContainer.jsx";
import { cloneDeep } from "lodash";

class MainArea extends Component {
  state = {
    bars: [], //width is either width or height depending upon the orientation
    totalBars: 0, //305    125
    barsHeight: 15, //if you want to change this then also change in .css  //2.18  //8.18
    barsWidth: 15, //5  multiplying fact in case of horizontal //1.6
    sortButtonIsPressed: false,
    isSorting: false,
    orientation: [
      "horizontal",
      "flex-end",
      "row-reverse",
      "flex-end",
      "height",
    ],
    generateButtonisActive: true,
    windoWidth: 0,
    windowHeight: 0,
    sortTypes: [
      { value: "bubble", id: 0, customeClass: "" },
      { value: "selection", id: 0, customeClass: "" },
      { value: "insertion", id: 0, customeClass: "" },
      { value: "quick", id: 0, customeClass: "" },
      { value: "heap", id: 0, customeClass: "" },
      { value: "merge", id: 0, customeClass: "" },
      { value: "radix", id: 0, customeClass: "" },
      { value: "shell", id: 0, customeClass: "" },
      { value: "bucket", id: 0, customeClass: "" },
    ], //"bubble,selection,insertion,quick,merge,heap,radix,shell,bucket"   /b-18 s-18 in-
    sortTypeSelected: "",
    sortingSpeed: 49, //decreasing this will increase the speed
    isUniform: false, //steady slop
    // barsPosition: "flex-end", //"center","flex-end"
  };

  sortIntervalId = 0;

  barsClone = [];
  i = 0;
  j = 0;
  n = 0;
  key = 0;
  tempBars = [];
  min_idx = 0;
  high = 0;
  low = 0;

  clone(obj) {
    return cloneDeep(obj);
  }

  resetEverything = () => {
    this.i = 0;
    this.j = 0;
    this.key = 0;
    this.tempBars = [];
    this.n = 0;
    this.barsClone = [];
    this.min_idx = 0;
    this.setState({ isSorting: false });
  };

  handleOnGenerateButtonPressed = () => {
    console.log(this.props);

    if (!this.state.isSorting) {
      clearInterval(this.sortIntervalId);
      this.setState({ isSorting: false });

      if (this.state.generateButtonisActive) {
        this.resetEverything();
        //generating random widths
        let barsCopy = [];
        let currWidth = 0;
        let currHeight = 0;
        let widthDiff = 400;
        let heightDiff = 120;
        let rightSpace = 30;
        if (this.state.windoWidth < 1050) {
          widthDiff = 40; //for mobile
          heightDiff = 60;
        } else {
          widthDiff = 940;
        }

        if (this.state.orientation[0] == "horizontal") {
          if (this.state.windoWidth < 1050) {
            currWidth = heightDiff - 40;
            heightDiff += heightDiff * 3;
            rightSpace = 0;
          }
          for (
            let i = 0;
            currWidth < this.state.windoWidth - this.state.barsWidth;
            i++
          ) {
            let randomHight = Math.floor(
              Math.random() * (this.state.windowHeight - heightDiff * 1.7) + 1
            );
            currWidth += this.state.barsWidth;

            barsCopy.push({
              pos: i,
              width: randomHight,
              barsCustomClass: "",
            });
          }
        } else {
          if (this.state.windoWidth < 550) currHeight = heightDiff * 2.2;
          else {
            currHeight = 30;
            // widthDiff = 3000;
          }
          for (let i = 0; currHeight < this.state.windowHeight - 152.5; i++) {
            let randomWidth = Math.floor(
              Math.random() * (this.state.windoWidth - widthDiff) + 1
            );

            currHeight += this.state.barsHeight;

            barsCopy.push({
              pos: i,
              width: randomWidth,
              barsCustomClass: "",
            });
          }
        }

        // //this.state.totalBars
        // if (!this.state.isHorizontal) {
        //   while (barsWidths.length < this.state.totalBars) {
        //     var r = Math.floor(Math.random() * this.state.totalBars) + 1;
        //     if (
        //       barsWidths.indexOf(r * this.state.barsHeight) === -1 ||
        //       !this.state.isUniform
        //     )
        //       barsWidths.push(r * this.state.barsHeight);
        //   }
        // } else {
        //   while (barsHeights.length < this.state.totalBars) {
        //     //this is for total no. of bars
        //     var r = Math.floor(Math.random() * maxHeight) + 1; //here
        //     if (
        //       barsHeights.indexOf(r * this.state.barsWidth) === -1 ||
        //       !this.state.isUniform
        //     )
        //       barsHeights.push(r * this.state.barsWidth);
        //   }
        // }

        // let i;
        // for (i = 0; i < this.state.totalBars; i++) {
        //   if (!this.state.isHorizontal)
        //     barsCopy.push({
        //       pos: i,
        //       width: barsWidths[i] - 3,
        //       barsCustomClass: "",
        //     });
        //   else
        //     barsCopy.push({
        //       pos: i,
        //       width: barsHeights[i] - 3,
        //       barsCustomClass: "",
        //     });
        // }

        this.setState({ bars: barsCopy, totalBars: barsCopy.length });

        //initialising the barsClone

        this.barsClone = this.clone(barsCopy);
      }
    }
  };

  constructor() {
    super();
    this.updateWindowDimensions();
  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  };

  updateWindowDimensions = () => {
    this.handleOnGenerateButtonPressed();
    if (window.innerWidth < 1000)
      //for mobile setting opening orientation as vertical
      this.setState({
        orientation: ["vertical", "flex-end", "column", "center", "width"],
      });
    this.setState({
      windoWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  handleOnSortButtonPressed = () => {
    if (
      !this.state.isSorting &&
      this.state.bars.length > 0 &&
      this.state.bars[0].barsCustomClass == ""
    ) {
      this.setState({ bars: this.barsClone, isSorting: true });
      this.setState({ generateButtonisActive: false });
      switch (this.state.sortTypeSelected.value) {
        case "bubble":
          this.BubbleSort();
          this.setState({ generateButtonisActive: true, isSorting: false });
          break;

        case "insertion":
          this.insertionSort();
          this.setState({ generateButtonisActive: true, isSorting: false });
          break;

        case "selection":
          this.selectionSort();
          this.setState({ generateButtonisActive: true, isSorting: false });
          break;

        case "quick":
          this.quickSortHandler();
          break;

        case "merge":
          this.mergeSortHandler();
          break;

        case "heap":
          this.heapSortHandler();
          break;

        case "radix":
          this.radixsortHandler();
          break;

        case "shell":
          this.shellSortHandler();
          break;

        case "bucket":
          this.bucketSort();
          this.setState({ bars: this.barsClone });
          this.setState({ generateButtonisActive: true, isSorting: false });
          break;

        default:
          alert("select sort type");
          this.setState({ isSorting: false });
          break;
      }
    } else {
      if (this.state.isSorting) alert("already in process");
      else alert("Generate first,DUde!");
    }
  };

  handleOnSortTypeSelected = (type) => {
    if (!this.state.isSorting) {
      this.handleOnGenerateButtonPressed();
      this.setState({
        generateButtonisActive: true,
        isSorting: false,
      });
      if (this.barsClone.length == 0) {
        this.handleOnGenerateButtonPressed();
        this.setState({
          generateButtonisActive: true,
          isSorting: false,
        });
      }
      let sortTypesCopy = cloneDeep(this.state.sortTypes);
      for (let i = 0; i < this.state.sortTypes.length; i++) {
        if (this.state.sortTypes[i] == type)
          sortTypesCopy[i].customeClass = "sort_button_pressed";
        else {
          sortTypesCopy[i].customeClass = "";
        }
      }

      this.setState({
        sortTypeSelected: type,
        sortTypes: sortTypesCopy,
        generateButtonisActive: true,
      });
    }
  };

  handleOnOrientationPressed = () => {
    this.handleOnOrientationPressed2();
  };

  async handleOnOrientationPressed2() {
    if (this.state.orientation[0] == "vertical")
      this.setState({
        orientation: [
          "horizontal",
          "flex-end",
          "row-reverse",
          "flex-end",
          "height",
        ],
      });
    else {
      this.setState({
        orientation: ["vertical", "flex-end", "column", "center", "width"],
      });
    }
    await this.sleep(5);
    this.handleOnGenerateButtonPressed();
  }

  ///selection sort -----------------------------------------

  selectionSort = () => {
    this.n = this.barsClone.length;
    this.j = 1; //in if I am using preincrement so for first comparison j becomes 0
    this.i = 0;
    this.min_idx = 0;
    this.sortIntervalId = setInterval(
      this.selectionSortInnerDriven,
      50 - this.state.sortingSpeed
    );
  };

  selectionSortInnerDriven = () => {
    //for n passses

    if (this.i >= this.n - 1) {
      clearInterval(this.sortIntervalId);

      this.setState({ bars: this.barsClone, isSorting: false });
    }
    if (this.j < this.n) {
      if (this.barsClone[this.j].width < this.barsClone[this.min_idx].width) {
        this.min_idx = this.j;
      }
      this.j++;
    } else {
      const temp = this.barsClone[this.min_idx].width;
      this.barsClone[this.min_idx].width = this.barsClone[this.i].width;
      this.barsClone[this.i].width = temp;
      this.barsClone[this.i].barsCustomClass = "sorted_bar";
      this.setState({ bars: this.barsClone });
      this.i++;
      this.min_idx = this.i;
      this.j = this.i + 1;
    }

    if (this.i < this.n && this.j < this.n) {
      const tempBars = cloneDeep(this.barsClone);
      tempBars[this.min_idx].barsCustomClass = "current_bar";
      if (this.i < this.min_idx)
        tempBars[this.i].barsCustomClass = "current_bar";
      this.setState({ bars: tempBars });
    }
  };

  handleonBarsHeightChange = (e, newvalue) => {
    this.handleonBarsHeightChangeDiven(e, newvalue);
  };

  async handleonBarsHeightChangeDiven(e, newvalue) {
    this.setState({ barsHeight: newvalue });
    await this.sleep(1);
    this.handleOnGenerateButtonPressed();
  }

  handleonBarsWidthChange = (e, newvalue) => {
    this.handleonBarsWidthChangeDriven(e, newvalue);
  };

  async handleonBarsWidthChangeDriven(e, newvalue) {
    this.setState({ barsWidth: newvalue });
    await this.sleep(1);
    this.handleOnGenerateButtonPressed();
  }

  handeleOnSpeedSliderChange = (e, newvalue) => {
    if (!this.state.sortButtonIsPressed) this.handleOnGenerateButtonPressed();
    this.setState({ sortingSpeed: newvalue });
  };

  //bubble sort =-------------------------------------------------------------
  BubbleSort() {
    this.n = this.barsClone.length;
    this.j = -1; //in if I am using preincrement so for first comparison j becomes 0
    this.i = 0;
    this.sortIntervalId = setInterval(
      this.BubbleSortInnerDriven,
      50 - this.state.sortingSpeed
    );
  }

  BubbleSortInnerDriven = () => {
    //for n passses

    if (this.i >= this.n - 1) {
      clearInterval(this.sortIntervalId);
    }
    if (++this.j < this.n - this.i - 1) {
      if (this.barsClone[this.j].width > this.barsClone[this.j + 1].width) {
        // swap
        let temp = this.barsClone[this.j].width;
        this.barsClone[this.j].width = this.barsClone[this.j + 1].width;
        this.barsClone[this.j + 1].width = temp;

        //color current
        const tempBars = cloneDeep(this.barsClone);
        tempBars[this.j].barsCustomClass = "current_bar";
        tempBars[this.j + 1].barsCustomClass = "current_bar";
        this.setState({ bars: tempBars });
      }
    } else {
      this.i++;
      // if (this.i <= this.n)
      this.barsClone[this.n - this.i].barsCustomClass = "sorted_bar";
      this.setState({ bars: this.barsClone });
      this.j = -1;
      return;
    }
  };

  //insertion sort ---------------------------------------------------------
  insertionSort = () => {
    this.n = this.barsClone.length;
    this.i = 1;
    this.key = this.barsClone[this.i].width;
    this.j = this.i - 1;
    this.sortIntervalId = setInterval(
      this.insertionSortInnerDriven,
      50 - this.state.sortingSpeed
    );
  };

  insertionSortInnerDriven = () => {
    if (this.i >= this.n) {
      clearInterval(this.sortIntervalId);
      this.setState({ bars: this.barsClone });
      this.colorSortedBars();
    }

    if (this.j >= 0 && this.barsClone[this.j].width > this.key) {
      this.barsClone[this.j + 1].width = this.barsClone[this.j].width;
      const tempBars = cloneDeep(this.barsClone);
      tempBars[this.j].barsCustomClass = "current_bar";
      // tempBars[this.j + 1].barsCustomClass = "current_bar";
      this.setState({ bars: tempBars });
      this.j--;
    } else {
      this.barsClone[this.j + 1].width = this.key;
      this.i++;
      if (this.i < this.n) {
        this.key = this.barsClone[this.i].width;
        this.j = this.i - 1;
        return;
      }
    }
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async quickSortHandler() {
    await this.quickSort(0, this.state.totalBars - 1);
    this.colorSortedBars();
    this.setState({ generateButtonisActive: true, isSorting: false });
  }

  async quickSort(start, end) {
    // Base case or terminating case
    if (start >= end) {
      // this.setState({ bars: this.barsClone });
      // this.colorSortedBars();
      return;
    }

    // Returns pivotIndex
    let index = await this.partition(start, end);

    // Recursively apply the same logic to the left and right subarrays
    await this.quickSort(start, index - 1);
    // await this.sleep(5);
    await this.quickSort(index + 1, end);
  }

  async partition(start, end) {
    // Taking the last element as the pivot
    const pivotValue = this.barsClone[end].width;
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      await this.sleep(50 - this.state.sortingSpeed);
      if (this.barsClone[i].width < pivotValue) {
        // Swapping elements
        [this.barsClone[i].width, this.barsClone[pivotIndex].width] = [
          this.barsClone[pivotIndex].width,
          this.barsClone[i].width,
        ];

        const tempBars = cloneDeep(this.barsClone);
        tempBars[i].barsCustomClass = "current_bar";
        tempBars[pivotIndex].barsCustomClass = "current_bar";
        this.setState({ bars: tempBars });
        // Moving to next element
        pivotIndex++;
      }
    }

    // Putting the pivot value in the middle
    [this.barsClone[pivotIndex].width, this.barsClone[end].width] = [
      this.barsClone[end].width,
      this.barsClone[pivotIndex].width,
    ];
    return pivotIndex;
  }

  async mergeSortHandler() {
    await this.mergeSort(0, this.state.totalBars - 1);
    this.colorSortedBars();
    this.setState({ generateButtonisActive: true, isSorting: false });
  }

  async merge(l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    // Create temp arrays
    let L = [];
    let R = [];

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) {
      L[i] = this.barsClone[l + i].width;
    }
    for (let j = 0; j < n2; j++) {
      R[j] = this.barsClone[m + 1 + j].width;
    }

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        this.barsClone[k].width = L[i];
        i++;
      } else {
        this.barsClone[k].width = R[j];
        j++;
      }
      k++;

      await this.sleep(50 - this.state.sortingSpeed);
      const tempBars = cloneDeep(this.barsClone);
      tempBars[k].barsCustomClass = "current_bar";
      this.setState({ bars: tempBars });
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      this.barsClone[k].width = L[i];
      i++;
      k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      this.barsClone[k].width = R[j];
      j++;
      k++;
    }
  }

  async mergeSort(l, r) {
    if (l >= r) {
      return; //returns recursively
    }
    let m = parseInt((l + r - 1) / 2);
    await this.mergeSort(l, m);
    await this.mergeSort(m + 1, r);
    await this.merge(l, m, r);
  }

  async heapSortHandler() {
    await this.heapSort();
    this.barsClone[0].barsCustomClass = "sorted_bar";
    this.setState({
      generateButtonisActive: true,
      bars: this.barsClone,
      isSorting: false,
    });
  }

  async heapSort() {
    let n = this.state.totalBars;

    // Build heap (rearrange array)
    for (let i = parseInt(n / 2 - 1); i >= 0; i--) await this.heapify(n, i);

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      let temp = this.barsClone[0].width;
      this.barsClone[0].width = this.barsClone[i].width;
      this.barsClone[i].width = temp;
      this.barsClone[i].barsCustomClass = "sorted_bar";

      // call max heapify on the reduced heap
      await this.heapify(i, 0);
    }
  }

  // To heapify a subtree rooted with node i which is
  // an index in arr[]. n is size of heap
  async heapify(n, i) {
    await this.sleep(50 - this.state.sortingSpeed);

    let largest = i; // Initialize largest as root
    let l = parseInt(2 * i + 1); // left = 2*i + 1
    let r = parseInt(2 * i + 2); // right = 2*i + 2

    // If left child is larger than root
    if (l < n && this.barsClone[l].width > this.barsClone[largest].width)
      largest = l;

    // If right child is larger than largest so far
    if (r < n && this.barsClone[r].width > this.barsClone[largest].width)
      largest = r;

    // If largest is not root
    if (largest != i) {
      let swap = this.barsClone[i].width;
      this.barsClone[i].width = this.barsClone[largest].width;
      this.barsClone[largest].width = swap;
      const tempBars = cloneDeep(this.barsClone);
      tempBars[i].barsCustomClass = "current_bar";
      tempBars[largest].barsCustomClass = "current_bar";
      this.setState({ bars: tempBars });

      // Recursively heapify the affected sub-tree
      await this.heapify(n, largest);
    }
  }

  getMax(n) {
    let mx = this.barsClone[0].width;
    for (let i = 1; i < n; i++)
      if (this.barsClone[i].width > mx) mx = this.barsClone[i].width;
    return mx;
  }

  // A function to do counting sort of this.barsClone[] according to
  // the digit represented by exp.
  async countSort(n, exp) {
    let output = new Array(n);
    for (let k = 0; k < n; ++k) output[k] = 0;

    let i;

    let count = new Array(n);
    for (let k = 0; k < n; ++k) count[k] = 0;

    // Store count of occurrences in count[]
    for (i = 0; i < n; i++)
      count[parseInt((this.barsClone[i].width / exp) % 10)]++;

    // Change count[i] so that count[i] now contains actual
    //  position of this digit in output[]
    for (i = 1; i < 10; i++) count[i] += count[i - 1];

    // Build the output array
    for (i = n - 1; i >= 0; i--) {
      output[
        count[parseInt((this.barsClone[i].width / exp) % 10)] - 1
      ] = this.barsClone[i].width;

      await this.sleep(20);
      const tempBars = cloneDeep(this.barsClone);

      tempBars[
        count[parseInt((this.barsClone[i].width / exp) % 10)] - 1
      ].barsCustomClass = "current_bar";

      // tempBars[i].barsCustomClass = "current_bar";
      // tempBars[].barsCustomClass = "current_bar";
      this.setState({ bars: tempBars });

      count[parseInt(this.barsClone[i].width / exp) % 10]--;
    }

    // Copy the output array to arr[], so that arr[] now
    // contains sorted numbers according to current digit
    for (i = 0; i < n; i++) {
      this.barsClone[i].width = output[i];
      await this.sleep(20);
      const tempBars = cloneDeep(this.barsClone);

      tempBars[i].barsCustomClass = "current_bar";
      // tempBars[].barsCustomClass = "current_bar";
      this.setState({ bars: tempBars });
    }
  }

  async radixsortHandler() {
    await this.radixsort(this.state.totalBars);
    this.colorSortedBars();
    this.setState({ generateButtonisActive: true, isSorting: false });
  }

  // The main function to that sorts arr[] of size n using
  // Radix Sort
  async radixsort(n) {
    // Find the maximum number to know number of digits

    let m = this.getMax(n);
    // Do counting sort for every digit. Note that instead
    // of passing digit number, exp is passed. exp is 10^i
    // where i is current digit number
    for (let exp = 1; parseInt(m / exp) > 0; exp = parseInt(exp * 10)) {
      await this.countSort(n, exp);
      // this.setState({ bars: this.barsClone });
    }
  }

  async shellSortHandler() {
    await this.shellSort();
    this.colorSortedBars();
    this.setState({ generateButtonisActive: true, isSorting: false });
  }

  async shellSort() {
    let n = this.state.totalBars;

    // Start with a big gap, then reduce the gap
    for (let gap = parseInt(n / 2); gap > 0; gap = parseInt(gap / 2)) {
      // Do a gapped insertion sort for this gap size.
      // The first gap elements a[0..gap-1] are already
      // in gapped order keep adding one more element
      // until the entire array is gap sorted
      for (let i = gap; i < n; i += 1) {
        // add a[i] to the elements that have been gap
        // sorted save a[i] in temp and make a hole at
        // position i
        let temp = this.barsClone[i].width;

        // shift earlier gap-sorted elements up until
        // the correct location for a[i] is found
        let j;
        const tempBars = cloneDeep(this.barsClone);

        for (
          j = i;
          j >= gap && this.barsClone[j - gap].width > temp;
          j -= gap
        ) {
          this.barsClone[j].width = this.barsClone[j - gap].width;
          await this.sleep(50 - this.state.sortingSpeed);
          tempBars[j].barsCustomClass = "current_bar";
          this.setState({ bars: tempBars });
        }

        // put temp (the original a[i]) in its correct
        // location
        await this.sleep(50 - this.state.sortingSpeed / 5);
        this.barsClone[j].width = temp;
        tempBars[j].barsCustomClass = "current_bar";
        this.setState({ bars: tempBars });
      }
    }
    return;
  }

  async bucketSort() {
    // 1) Create n empty buckets
    // let b = [];
    let ratio = this.state.totalBars * 50;
    let size = this.state.totalBars;
    let b = new Array(size);

    // making widht smaller as to create arrays of less size
    for (let i = 0; i < this.state.totalBars; i++) {
      this.barsClone[i].width /= ratio;
    }

    // for (let i = 0; i < size; ++i) b[i] = 0;

    let n = this.state.totalBars;
    // 2) Put array elements in different buckets
    for (let i = 0; i < size; i++) {
      b[i] = new Array();
    }

    for (let i = 0; i < n; i++) {
      let bi = n * this.barsClone[i].width; // Index in bucket
      // b[parseInt(bi)] = new Array();
      await this.sleep(50 - this.state.sortingSpeed);
      let tempBars = cloneDeep(this.barsClone);
      for (let k = 0; k < this.state.totalBars; k++) {
        tempBars[k].width = tempBars[k].width * ratio;
        // if (k < index) tempBars[k].barsCustomClass = "sorted_bar";
      }
      tempBars[i].barsCustomClass = "current_bar";
      this.setState({ bars: tempBars });

      b[parseInt(bi)].push(this.barsClone[i].width);
    }

    // 3) Sort individual buckets
    for (let i = 0; i < size; i++) b[i].sort();

    // 4) Concatenate all buckets into arr[]
    let index = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < b[i].length; j++) {
        this.barsClone[index++].width = b[i][j];
        let tempBars = cloneDeep(this.barsClone);
        for (let k = 0; k < this.state.totalBars; k++) {
          tempBars[k].width = tempBars[k].width * ratio;
          if (k < index) tempBars[k].barsCustomClass = "sorted_bar";
        }
        if (index < this.state.totalBars)
          tempBars[index].barsCustomClass = "current_bar";
        this.setState({ bars: tempBars });
        await this.sleep(50 - this.state.sortingSpeed * 3);
      }
    }

    for (let i = 0; i < this.state.totalBars; i++) {
      this.barsClone[i].width *= ratio;
    }
  }

  colorSortedBars = () => {
    if (this.state.sortTypeSelected.value == "insertion")
      this.i = this.state.totalBars - 2;
    else this.i = this.state.totalBars - 1;
    this.sortIntervalId = setInterval(() => {
      if (this.i < 0) {
        clearInterval(this.sortIntervalId);
        this.resetEverything();
      } else {
        this.barsClone[this.i].barsCustomClass = "sorted_bar";
        this.setState({ bars: this.barsClone });
        this.i--;
      }
    }, 50 - this.state.sortingSpeed);
  };

  render() {
    return (
      <React.Fragment>
        <BarsContainer
          bars={this.state.bars}
          OnGenerateButtonPressed={this.handleOnGenerateButtonPressed}
          OnSortButtonPressed={this.handleOnSortButtonPressed}
          barsPosition={this.state.barsPosition}
          sortTypes={this.state.sortTypes}
          onSortTypeSelected={this.handleOnSortTypeSelected}
          OnOrientationPressed={this.handleOnOrientationPressed}
          orientation={this.state.orientation}
          barsHeight={this.state.barsHeight}
          barsWidth={this.state.barsWidth}
          onSpeedSliderChange={this.handeleOnSpeedSliderChange}
          onbarSizeSliderChange={this.handleOnbarSizeSliderChange}
          sortingSpeed={this.state.sortingSpeed}
          onBarsHeightChange={this.handleonBarsHeightChange}
          onBarsWidthChange={this.handleonBarsWidthChange}
          windoWidth={this.state.windoWidth}
          onSortingPressed={this.props.onSortingPressed}
          onSearchingPressed={this.props.onSearchingPressed}
          isSortingSelected={this.props.isSortingSelected}
        />
      </React.Fragment>
    );
  }
}

export default MainArea;
