import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text,  } from 'react-native';
import Header from '../../component/Header';

import { HOME_SCREEN } from '../../utils/StringConstant';
import {
  LineChart, PieChart, BarChart, ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import ViewShot from "react-native-view-shot";

import CarouselComponent from '../../component/CarouselComponent';
import HorizontalList from './HorizontalList';
import useSWR from 'swr';
import Video from 'react-native-video';
import { moderateScale } from '../../utils/Metrics';
import ColorConstant from '../../utils/ColorConstant';
import { callApi, fetcher } from '../../helper/ApiHelper';
import AnimatedFlatList from '../../component/AnimatedFlatlist';
import Animated, { useSharedValue } from 'react-native-reanimated'; 

const dataStackedBarChart = {
  labels: ["Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 60],
    [30, 30, 60]
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
};

const dataProgress = {
  labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8]
};

const dataBarChart = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const commitsData = [
  { date: "2017-01-02", count: 1 },
  { date: "2017-01-03", count: 2 },
  { date: "2017-01-04", count: 3 },
  { date: "2017-01-05", count: 4 },
  { date: "2017-01-06", count: 5 },
  { date: "2017-01-30", count: 2 },
  { date: "2017-01-31", count: 3 },
  { date: "2017-03-01", count: 2 },
  { date: "2017-04-02", count: 4 },
  { date: "2017-03-05", count: 2 },
  { date: "2017-02-30", count: 4 }
];

const pieChartData = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];
let videoURL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

const HomeScreen = ({ navigation }) => {
  const [isVideoPlaying, setisVideoPlaying] = useState(true)
  const ref = React.useRef();
  const { data, isLoading } = useSWR({ url: "https://dummyjson.com/products" }, fetcher)
  console.log('isLoading HomeScreen --> ', JSON.stringify(isLoading))
  console.log('data HomeScreen --> ', JSON.stringify(data)) 

   // console.log('viewableItems HomeScreen --> ',JSON.stringify(viewableItems))
   const [homeData,setHomeData]= React.useState([])

   useEffect(()=>{
    let object = { generes: [{title:"generes",isSelected:true}], instruments: [{title:"instruments",isSelected:true}], thirdOption: [{title:"thirdOption",isSelected:true}] };

    for (const property in object) {
      console.log(`useEffect --> ${property}: ${JSON.stringify(object[property])}`);
     }
   }, [])

  return <AnimatedFlatList data={data?.products} />
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
      <Header title={HOME_SCREEN} />

      <ScrollView  >

      <ViewShot ref={ref} options={{ fileName: "screen_shot", format: "jpg", quality: 0.9 }}>
        <CarouselComponent data={data?.products} />
      </ViewShot>

      <Video source={{ uri: videoURL }}
        onLoadStart={() => console.log('onLoadStart -->',)}
        paused={!isVideoPlaying}
        muted={true}
        onEnd={() => setisVideoPlaying(false)}
        onError={(err) => console.log('onError -->', err)}
        onLoad={() => console.log('onLoad -->',)}
        resizeMode={'cover'}
        style={{ height: Dimensions.get('window').width - 40, width: Dimensions.get('window').width, }} />

      <Text style={{ fontSize: moderateScale(20), color: ColorConstant.BLACK, alignSelf: 'center' }} 
      onPress={() => setisVideoPlaying(!isVideoPlaying)}>{`${isVideoPlaying ? 'Pause' : 'Play'}`}</Text>

      {/* <Image source={{uri:screenShot,}} style={{height:300,width:300,alignSelf:'center'}}/> */}
      {/* <HorizontalList data={data?.products} title={'Deal of the day'} onPressViewAll={() => navigation.navigate('PLPScreen')} /> */}




      <ProgressChart
        style={{ marginTop: 10 }}
        data={dataProgress}
        width={Dimensions.get('window').width}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        hideLegend={false}
      />

      <LineChart
        style={{
          marginTop: 10, marginVertical: 8,
          borderRadius: 16
        }}
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
      />

      <BarChart
        // style={graphStyle}
        data={dataBarChart}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        verticalLabelRotation={30}
      />

      <ContributionGraph
        values={commitsData}
        endDate={new Date("2017-04-01")}
        numDays={105}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
      />

      <StackedBarChart
        style={{ marginTop: 10 }}
        data={dataStackedBarChart}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
      />

      <PieChart
        data={pieChartData}
        style={{ marginTop: 10 }}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 50]}
        absolute />

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;