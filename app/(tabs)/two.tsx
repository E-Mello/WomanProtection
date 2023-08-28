import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';

interface Section {
  title: string;
  content: string[];
}

const SECTIONS: Section[] = [
  {
    title: 'Accordion 1',
    content: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  },
  {
    title: 'Accordion 2',
    content: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  },
  {
    title: 'Accordion 3',
    content: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  },
  {
    title: 'Accordion 4',
    content: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  },
  {
    title: 'Accordion 5',
    content: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  },
];

export default function TabTwoScreen() {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = (section: Section, _: number, isActive: boolean) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section: Section) => {
    return (
      <View style={styles.content}>
        {section.content.map((item, index) => (
          <Text key={index} style={styles.contentText}>
            {item}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        onChange={setActiveSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        sectionContainerStyle={{ marginBottom: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#f1efef',
  },
  contentText: {
    fontSize: 14,
  },
});
