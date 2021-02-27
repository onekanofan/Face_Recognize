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
        tip:"请先上传一张仅包含目标人脸的照片",
        similarity:'',
        imguri1:'http://image1.big-bit.com/2017/0809/20170809045638669.png',
        imguri2:'http://image1.big-bit.com/2017/0809/20170809045638669.png',
        imgh1:200,
        imgh2:200
    }
    render(){
        return(
            <Container style={[styles.centerLayOut,{height:this.state.imgh1+this.state.imgh2+350}]}>
                <Text>提取</Text>
                <Text note>     请先后上传一张仅包含目标人脸的照片和一张包含复数人脸的照片，系统将在后者标注前者在后者中的位置</Text>
                <Card>
                    <CardItem>
                        <Body>
                            <Text note>请先上传一张仅包含目标人脸的照片</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri:this.state.imguri1}} style={{height: this.state.imgh1, width: 330}}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button transparent
                                    style={{
                                        width:150
                                    }}
                                    onPress={() => ImagePicker.openPicker({
                                        includeBase64:true,
                                        compressImageMaxWidth:400,
                                        compressImageMaxHeight:400
                                    }).then((image) => {
                                        let formdata=new FormData();
                                        formdata.append("base_origin",image.data);
                                        fetch("http://118.190.36.34:25213/upImgOrigin", {
                                            method: "POST",
                                            body: formdata,
                                            headers: {
                                                "Content-Type": "multipart/form-data"
                                            }
                                        }).then(resp=>resp.json())
                                            .then(resp=>{
                                                this.setState({
                                                    tip:"再上传一张包含复数人脸的照片",
                                                    similarity:'',
                                                    imguri1:image.path,
                                                    imgh1:330*image.height/image.width,
                                                    imguri2:'http://image1.big-bit.com/2017/0809/20170809045638669.png',
                                                    imgh2:200,
                                                })
                                            })
                                    })}>
                                <MaterialIcons
                                    name='camera'
                                    size={25}
                                    color={'#74b9ff'}
                                ></MaterialIcons>
                                <Text style={styles.textstyle}>从相册选择</Text>
                            </Button>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text note>{this.state.tip}</Text>
                            <Text style={styles.textred}>{this.state.similarity}</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri:this.state.imguri2}} style={{height: this.state.imgh2, width: 330}}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button transparent
                                    style={{
                                        width:150
                                    }}
                                    onPress={() => ImagePicker.openPicker({
                                        includeBase64:true,
                                        compressImageMaxWidth:400,
                                        compressImageMaxHeight:400
                                    }).then((image) => {
                                        let formdata=new FormData();
                                        formdata.append("base_multi",image.data);
                                        fetch("http://118.190.36.34:25213/searchImgFace", {
                                            method: "POST",
                                            body: formdata,
                                            headers: {
                                                "Content-Type": "multipart/form-data"
                                            }
                                        }).then(resp=>resp.json())
                                            .then(resp=>{
                                                let baseImg=`data:image/png/jpg;base64,${resp.base64str}`;
                                                this.setState({
                                                    tip:"提取结果：",
                                                    similarity:"相似度："+resp.score+"%",
                                                    imguri2:baseImg,
                                                    imgh2:330*image.height/image.width
                                                })
                                            })
                                    })}>
                                <MaterialIcons
                                    name='camera'
                                    size={25}
                                    color={'#74b9ff'}
                                ></MaterialIcons>
                                <Text style={styles.textstyle}>从相册选择</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    centerLayOut: {
        display: 'flex' ,
        flexDirection: 'column' ,
        alignItems: 'center',
        margin:10
    } ,
    blueColor: {
        backgroundColor: '#74b9ff'
    },
    wrapper: {
        width:330,
        height:200,
    },
    textred: {
        fontSize:15,
        color:'red',
    },
    textstyle: {
        color:'black',
        fontSize:15,
    }
});
