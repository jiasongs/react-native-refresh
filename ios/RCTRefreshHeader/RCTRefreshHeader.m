//
//  RCTRefreshHeader.m
//  RNTemplate
//
//  Created by RuanMei on 2019/8/29.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RCTRefreshHeader.h"

@interface RCTRefreshHeader ()

@property (nonatomic, assign) MJRefreshState preState;

@end

@implementation RCTRefreshHeader

-(void)dealloc {
    NSLog(@"dealloc");
}

- (void)setState:(MJRefreshState)state {
    [super setState:state];
    if (self.onChangeState) {
        if (state == MJRefreshStateIdle && _preState == MJRefreshStateRefreshing) {
            self.onChangeState(@{@"state":@(4)});
        } else {
            self.onChangeState(@{@"state":@(state)});
        }
    }
    _preState = state;
}

-(void)scrollViewContentOffsetDidChange:(NSDictionary *)change {
    [super scrollViewContentOffsetDidChange:change];
    if (self.onChangeOffset) {
        CGPoint newPoint = [change[@"new"] CGPointValue];
        CGPoint oldPoint = [change[@"old"] CGPointValue];
        if (!CGPointEqualToPoint(newPoint, oldPoint)) {
            self.onChangeOffset(@{@"offset":@(fabs(newPoint.y))});
        }
    }
}

- (void)setRefreshing:(BOOL)refreshing {
    if (refreshing && self.state == MJRefreshStateIdle) {
        MJRefreshDispatchAsyncOnMainQueue({
            [self beginRefreshing];
        })
    } else if (!refreshing && (self.state == MJRefreshStateRefreshing || self.state == MJRefreshStateWillRefresh)) {
        MJRefreshDispatchAsyncOnMainQueue({
             __weak typeof(self) weakSelf = self;
            [self endRefreshingWithCompletionBlock:^{
                typeof(weakSelf) self = weakSelf;
                if (self.onChangeState) {
                    self.onChangeState(@{@"state":@(MJRefreshStateIdle)});
                }
            }];
        })
    }
}

@end
