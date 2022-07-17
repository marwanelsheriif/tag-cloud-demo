import {
  AppliedPrompts,
  Context,
  onDrillDownFunction,
  ResponseData,
  TContext
} from '@incorta-org/component-sdk';
import React from 'react';
import Highcharts from 'highcharts';
import wordCloud from 'highcharts/modules/wordcloud.js';
import HighchartsReact from 'highcharts-react-official';

wordCloud(Highcharts);

interface Props {
  context: Context<TContext>;
  prompts: AppliedPrompts;
  data: ResponseData;
  drillDown: onDrillDownFunction;
}

const TagCloudDemo = ({ context, prompts, data, drillDown }: Props) => {
  console.log({ context, prompts, data, drillDown });
  var startTime = performance.now();
  const handleText = (data: any) => {
    const stopWords = new Set([
      'i',
      'me',
      'my',
      'myself',
      'we',
      'our',
      'ours',
      'ourselves',
      'you',
      'your',
      'yours',
      'yourself',
      'yourselves',
      'he',
      'him',
      'his',
      'himself',
      'she',
      'her',
      'hers',
      'herself',
      'it',
      'its',
      'itself',
      'they',
      'them',
      'their',
      'theirs',
      'themselves',
      'what',
      'which',
      'who',
      'whom',
      'this',
      'that',
      'these',
      'those',
      'am',
      'is',
      'are',
      'was',
      'were',
      'be',
      'been',
      'being',
      'have',
      'has',
      'had',
      'having',
      'do',
      'does',
      'did',
      'doing',
      'a',
      'an',
      'the',
      'and',
      'but',
      'if',
      'or',
      'because',
      'as',
      'until',
      'while',
      'of',
      'at',
      'by',
      'for',
      'with',
      'about',
      'against',
      'between',
      'into',
      'through',
      'during',
      'before',
      'after',
      'above',
      'below',
      'to',
      'from',
      'up',
      'down',
      'in',
      'out',
      'on',
      'off',
      'over',
      'under',
      'again',
      'further',
      'then',
      'once',
      'here',
      'there',
      'when',
      'where',
      'why',
      'how',
      'all',
      'any',
      'both',
      'each',
      'few',
      'more',
      'most',
      'other',
      'some',
      'such',
      'no',
      'nor',
      'not',
      'only',
      'own',
      'same',
      'so',
      'than',
      'too',
      'very',
      's',
      't',
      'can',
      'will',
      'just',
      'don',
      'should',
      'now',
      'I'
    ]);

    // const textArr = text.split(" ");
    const counts = {};
    let maxTagsNum = 250;
    let fontFamily = 'Arial';
    let singleColor = undefined;

    // @ts-ignore
    if (context.component.bindings?.['tray-key'][0].settings.tagsMaxNum) {
      // @ts-ignore
      maxTagsNum = context.component.bindings['tray-key'][0].settings.tagsMaxNum + 1;
    }

    // @ts-ignore
    if (context.component.bindings?.['tray-key'][0].settings.fontFamily) {
      // @ts-ignore
      fontFamily = context.component.bindings['tray-key'][0].settings.fontFamily;
    }

    // @ts-ignore
    if (context.component.bindings?.['tray-key'][0].settings.singleColor) {
      // @ts-ignore
      singleColor = context.component.bindings['tray-key'][0].settings.singleColor;
      console.log(singleColor);
    }

    // @ts-ignore
    data.data.forEach(point => {
      for (const tag of point[0].value.split(' ')) {
        if (!stopWords.has(tag.toLowerCase())) {
          counts[tag] = counts[tag] ? counts[tag] + 1 : 1;
        }
      }
    });

    let result = Object.entries(counts).map(([name, weight]) => ({
      name: name,
      weight: weight
    }));

    // @ts-ignore
    result.sort((a, b) => b.weight - a.weight);
    console.log(result.length);
    result = result.slice(0, maxTagsNum);

    const newOptions = {
      series: [
        {
          type: 'wordcloud',
          data: result,
          rotation: {
            from: 0,
            to: 0
          },
          minFontSize: 7,
          maxFontSize: 30,
          style: {
            fontFamily: fontFamily,
            fontWeight: 'bold'
          },
          colors: singleColor ? [singleColor] : undefined
        }
      ],
      credits: {
        enabled: false
      },
      title: {
        text: 'Tag Cloud Demo'
      },
      animation: {
        defer: 0,
        duration: 500
      }

      // borderColor: '#303030',
      // borderRadius:10,
      // borderWidth:10
    };
    return newOptions;
  };

  const options = handleText(data);

  var endTime = performance.now();

  console.log(`Call to handleText took ${endTime - startTime} milliseconds`);
  return (
    <React.Fragment>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </React.Fragment>
  );
};

export default TagCloudDemo;
