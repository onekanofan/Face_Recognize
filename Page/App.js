import React , {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {} from 'react-native-material-ui';
import Feather from 'react-native-vector-icons/Feather';

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
import Contain1 from './Contain1';
import Contain2 from './Contain2';
import Contain3 from './Contain3';

export default class FooterTabsBadgeExample extends Component {
    state={
        Page:1,
    }
    render() {
        return (
            <Container>
                <Header style={[styles.centerLayOut , styles.blueColor]}>
                    <Title>人脸识别</Title>
                </Header>
                <Content contentContainerStyle={[styles.centerLayOut,{flexDirection: 'column'}]}>
                    {this.state.Page===1?<Contain1 />:this.state.Page===2?<Contain2 />:<Contain3 />}
                </Content>
                <Footer>
                    <FooterTab style={{backgroundColor: '#74b9ff'}}>
                        <Button vertical onPress={()=>{
                            this.setState({
                                Page:1,
                            })
                        }}>
                            <Icon name="camera"
                                  size={25}
                                  style={{color: 'white'}}/>
                            <Text style={{color: 'white'}}>识别</Text>
                        </Button>
                        <Button vertical onPress={()=>{
                            this.setState({
                                Page:2,
                            })
                        }}>
                            <Feather
                                name={'users'}
                                size={25}
                                color={'white'} />
                            <Text style={{color: 'white'}}>比较</Text>
                        </Button>
                        <Button vertical onPress={()=>{
                            this.setState({
                                Page:3,
                            })
                        }}>
                            <Icon name="apps"
                                  size={25}
                                  style={{color: 'white'}}/>
                            <Text style={{color: 'white'}}>提取</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    centerLayOut: {
        display: 'flex' ,
        flexDirection: 'row' ,
        justifyContent: 'center' ,
        alignItems: 'center'
    } ,
    blueColor: {
        backgroundColor: '#74b9ff'
    }
});
