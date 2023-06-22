// import { Dimensions, Text, View } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

import BackgroundImage from "../components/ui/BackgroundImage";

function HowTo() {
    // const width = Dimensions.get('window').width;
    // return (
    //     <BackgroundImage style={{ flex: 1 }}>
    //         <Carousel
    //             loop
    //             width={width}
    //             height={width / 2}
    //             autoPlay={true}
    //             data={[...new Array(6).keys()]}
    //             scrollAnimationDuration={1000}
    //             onSnapToItem={(index) => console.log('current index:', index)}
    //             renderItem={({ index }) => (
    //                 <View
    //                     style={{
    //                         flex: 1,
    //                         borderWidth: 1,
    //                         justifyContent: 'center',
    //                     }}
    //                 >
    //                     <Text style={{ textAlign: 'center', fontSize: 30 }}>
    //                         {index}
    //                     </Text>
    //                 </View>
    //             )}
    //         />
    //     </BackgroundImage>
    // );
    return <BackgroundImage></BackgroundImage>
}

export default HowTo;
