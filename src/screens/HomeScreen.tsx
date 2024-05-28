import React, {PropsWithChildren, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {connect, DispatchProp, Matching} from 'react-redux';
import {Action, CombinedState, Dispatch} from 'redux';
import {actions} from '../context/reduxConfig';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootStackParamList';
import {normalize} from '../common/helpers/responsive';
import uuid from 'react-native-uuid';
import {formItemsProps} from '../common/types';

type HomeScreen = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreen;
  dispatch: Dispatch<Action>;
  formItems: formItemsProps[];
};

type otherProp = PropsWithChildren<
  Matching<{formItems: formItemsProps[] | undefined} & DispatchProp<any>, Props>
>;

const HomeScreen = ({dispatch, navigation, formItems, ...props}: otherProp) => {
  const [formName, setFormName] = useState('');
  const [formPlaceHolder, setFormPlaceHolder] = useState('');

  const [selectedItemForm, setSelectedItemForm] = useState('Text');

  const addField = () => {
    const newField = {
      id: uuid.v4(),
      value: '',
      fieldName: formName,
      fieldPlaceHolder: formPlaceHolder,
      fieldType: selectedItemForm,
    };
    if (formItems) {
      dispatch(actions.addFormItem([...formItems, newField]));
    }
  };

  const removeField = id => {
    const updatedArray = formItems?.filter(field => field.id !== id);
    console.log({formItems});

    if (updatedArray) {
      dispatch(actions.addFormItem([...updatedArray]));
    }

    // setFields(fields.filter(field => field.id !== id));
  };

  const handleFieldChange = (id, value) => {
    // setFields(
    //   formItems.map(field => (field.id === id ? {...field, value} : field)),
    // );
    const modifiedItems = formItems.map(field =>
      field.id === id ? {...field, value} : field,
    );

    if (modifiedItems) {
      dispatch(actions.addFormItem([...modifiedItems]));
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {marginVertical: Platform.OS === 'android' ? normalize(15) : 0},
      ]}>
      <View style={styles.container}>
        <Text style={styles.label}>Form Name:</Text>
        <TextInput
          style={styles.input}
          value={formName}
          onChangeText={setFormName}
          placeholder="Enter form name"
        />
        <TextInput
          style={styles.input}
          value={formPlaceHolder}
          onChangeText={setFormPlaceHolder}
          placeholder="Enter form placeholder"
        />
        <Picker
          style={{height: 50, width: 150, marginBottom: 10}}
          selectedValue={selectedItemForm}
          onValueChange={itemValue => setSelectedItemForm(itemValue)}>
          <Picker.Item label="Text" value="default" />
          <Picker.Item label="Number" value="numeric" />
        </Picker>
        <View style={{flex: Platform.OS === 'web' ? undefined : 1}}>
          <FlatList
            data={formItems}
            style={styles.flatlistContainer}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.fieldContainer}>
                <View>
                  <Text style={{color: 'black', fontWeight: '700'}}>
                    {item.fieldName || 'Field Name'}
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={item.value}
                    keyboardType={item.fieldType}
                    inputMode={item.fieldType}
                    onChangeText={text => handleFieldChange(item.id, text)}
                    placeholder={item.fieldPlaceHolder || 'Form name'}
                  />
                </View>

                <Pressable onPress={() => removeField(item.id)}>
                  <Text style={styles.button}>Remove</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
        <Pressable onPress={addField}>
          <Text style={styles.button}>Add Field</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

type stateProps = CombinedState<{formItems: {formItems: []}}> | undefined;

const mapStateToProps = (state: stateProps) => ({
  formItems: state?.formItems.formItems,
});
export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },

  flatlistContainer: {
    borderWidth: 0,
  },
  fieldContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 5,
  },
});
