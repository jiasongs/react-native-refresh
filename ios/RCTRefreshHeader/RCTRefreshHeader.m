//
//  RCTRefreshHeader.m
//  RNTemplate
//
//  Created by RuanMei on 2019/8/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RCTRefreshHeader.h"

@interface RCTRefreshHeader ()

@end

@implementation RCTRefreshHeader

- (void)setState:(MJRefreshState)state {
  [super setState:state];
  if (self.onChangeState) {
    self.onChangeState(@{@"state":@(state)});
  }
}

-(void)scrollViewContentOffsetDidChange:(NSDictionary *)change {
  [super scrollViewContentOffsetDidChange:change];
  if (self.onChangeOffset) {
    CGPoint newPoint = [change[@"new"] CGPointValue];
    CGPoint oldPoint = [change[@"old"] CGPointValue];
    if (!CGPointEqualToPoint(newPoint, oldPoint)) {
      self.onChangeOffset(@{
                            @"newOffset":@{
                                @"x":@(newPoint.x),
                                @"y":@(newPoint.y),
                                },
                            @"oldOffset":@{
                                @"x":@(oldPoint.x),
                                @"y":@(oldPoint.y),
                                },
                            });
    }
  }
}

- (void)setRefreshing:(BOOL)refreshing {
  if (refreshing && self.state == MJRefreshStateIdle) {
    dispatch_async(dispatch_get_main_queue(), ^{
//      [self beginRefreshing];
    });
  } else if (!refreshing && (self.state == MJRefreshStateRefreshing || self.state == MJRefreshStateWillRefresh)) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [self endRefreshing];
    });
  }
}

@end
