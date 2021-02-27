import React , {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {} from 'react-native-material-ui';
import ImagePicker from 'react-native-image-crop-picker';
import {
    View ,
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
import {black} from "react-native-material-ui/src/styles/colors";
export default class Contain1 extends Component{
    state={
        gender:'--',
        age:'--',
        imguri:'http://image1.big-bit.com/2017/0809/20170809045638669.png',
        imgh:200
    }
    render(){
        return(
            <Container style={[styles.centerLayOut,{height:this.state.imgh+280}]}>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>识别</Text>
                                <Text note>     请上传一张仅包含一个人脸的图片以获取其特征</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri:this.state.imguri}} style={{height: this.state.imgh, width: 330}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Text note>年龄：</Text>
                                <Text style={styles.textstyle}>{this.state.age}</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent>
                                <Text note>性别：</Text>
                                <Text style={styles.textstyle}>{this.state.gender}</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
                <Button iconLeft rounded
                        style={[{
                            width: 200 ,
                            backgroundColor: '#74b9ff' ,
                        } , styles.centerLayOut]}
                        onPress={() => ImagePicker.openCamera({
                            cropping: true ,
                            includeBase64:true,
                            freeStyleCropEnabled:true,
                            compressImageMaxWidth:400,
                            compressImageMaxHeight:400
                        }).then((image) => {
                            let formdata=new FormData();
                            formdata.append("base",image.data);
                            fetch("http://118.190.36.34:25213/genderAge", {
                                method: "POST",
                                body: formdata,
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then(resp=>resp.json())
                            .then(resp=>{
                                this.setState({
                                    age:resp.age,
                                    gender:resp.gender,
                                    imguri:image.path,
                                    imgh:330*image.height/image.width
                                })
                            })
                        })}>
                    <Icon name="camera"/>
                    <Text>拍照</Text>
                </Button>
                <Button transparent
                        style={{
                            width:120
                        }}
                        onPress={() => ImagePicker.openPicker({
                            includeBase64:true,
                            compressImageMaxWidth:400,
                            compressImageMaxHeight:400
                        }).then((image) => {
                            let formdata=new FormData();
                            formdata.append("base",image.data);
                            fetch("http://118.190.36.34:25213/genderAge", {
                                method: "POST",
                                body: formdata,
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then(resp=>resp.json())
                                .then(resp=>{
                                    this.setState({
                                        age:resp.age,
                                        gender:resp.gender,
                                        imguri:image.path,
                                        imgh:330*image.height/image.width
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
        margin:10
    } ,
    blueColor: {
        backgroundColor: '#74b9ff'
    },
    textstyle: {
        marginLeft:-20,
        fontSize:15,
        color:'red',
    },
});
