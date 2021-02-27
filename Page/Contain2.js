import React , {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {} from 'react-native-material-ui';
import ImagePicker from 'react-native-image-crop-picker';
import {
    Container ,
    Header ,
    Content ,
    Footer ,
    FooterTab ,
    Button ,
    Icon ,
    Text ,
    Badge ,
    Left ,
    Body ,
    Right ,
    Title ,
    Card ,
    CardItem ,
    Thumbnail
} from 'native-base';
import Swiper from 'react-native-swiper';
export default class Contain1 extends Component{
    state={
        similarity:'--',
        imguri1:'http://image1.big-bit.com/2017/0809/20170809045638669.png',
        imguri2:'http://image1.big-bit.com/2017/0809/20170809045638669.png',
        imgh1:200,
        imgh2:200
    }
    render(){
        return(
            <Container style={[styles.centerLayOut,{height:this.state.imgh1>this.state.imgh2?this.state.imgh1+200:this.state.imgh2+200,margin:10}]}>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>比较</Text>
                                <Text note>     请上传两张仅包含一个人脸的图片以进行比较</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <View style={{height: this.state.imgh1>this.state.imgh2?this.state.imgh1:this.state.imgh2, width: 330}}>
                        <Swiper
                            showsButtons={false}
                            autoplay={true}
                            dotColor={'rgba(200,200,200,.5)'}
                            activeDotColor={'white'}
                        >
                            <Image source={{uri:this.state.imguri1}} style={[{height: this.state.imgh1, width: 330}]}/>
                            <Image source={{uri:this.state.imguri2}} style={[{height: this.state.imgh2, width: 330}]}/>
                        </Swiper>
                        </View>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button transparent>
                                <Text note>相似度：</Text>
                                <Text style={styles.textstyle}>{this.state.similarity}</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
                <Button transparent
                        style={{
                            width:120
                        }}
                        onPress={() => ImagePicker.openPicker({
                            multiple: true ,
                            includeBase64:true,
                            compressImageMaxWidth:400,
                            compressImageMaxHeight:400
                        }).then((image) => {
                            let formdata=new FormData();
                            formdata.append("base_1",image[0].data);
                            formdata.append("base_2",image[1].data);
                            fetch("http://118.190.36.34:25213/compare", {
                                method: "POST",
                                body: formdata,
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then(resp=>resp.json())
                                .then(resp=>{
                                    this.setState({
                                        similarity:resp.score+"%",
                                        imguri1:image[0].path,
                                        imguri2:image[1].path,
                                        imgh1:330*image[0].height/image[0].width,
                                        imgh2:330*image[1].height/image[1].width
                                    })
                                })
                        })}>
                    <MaterialIcons
                        name='camera'
                        size={25}
                        color={'#74b9ff'}
                    ></MaterialIcons>
                    <Text style={{color:'black', fontSize:15}}>从相册选择</Text>
                </Button>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    centerLayOut: {
        display: 'flex' ,
        flexDirection: 'column' ,
        alignItems: 'center',
    } ,
    blueColor: {
        backgroundColor: '#74b9ff'
    },
    textstyle: {
        marginLeft:-20,
        fontSize:15,
        color:'red',
    },
    activeDot: {
        backgroundColor : '#fff',
    }
});
