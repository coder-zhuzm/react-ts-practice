import React, { memo, useEffect, useState } from 'react';
import { InfiniteScroll, List } from 'antd-mobile'
import { Card } from 'antd'
import Lesson from '@/typings/lesson';
import { Link } from 'react-router-dom';
interface Props {
  children?: any;
  lessons?: any;
  getLessons?: any;
  container?: any;
}
export default memo(function LessonList(props: Props) {
  const { lessons } = props
  useEffect(() => {
    if (props.lessons.list.length === 0) {
      props.getLessons();
    }
  }, []);
  async function loadMore() {
    await props.getLessons();
  }
  return <div>
    <List>
      {lessons.list.map((lesson: Lesson, index: number) => (
        <List.Item key={index}>
          {
            <Link
              key={lesson._id}
              to={`/detail/${lesson._id}`}
              state={lesson}
            >
              <Card
                hoverable={true}
                style={{ width: "100%" }}
                cover={<img alt={lesson.title} src={lesson.poster} />}
              >
                <Card.Meta
                  title={lesson.title}
                  description={`价格: ${lesson.price}`}
                />
              </Card>
            </Link>
          }
        </List.Item>
      ))}
    </List>

    <InfiniteScroll loadMore={loadMore} hasMore={lessons.hasMore || false} />
  </div>;
});
