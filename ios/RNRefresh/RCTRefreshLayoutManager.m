//
//  RCTRefreshLayoutManager.m
//  RNRefresh
//
//  Created by jiasong on 2019/9/2.
//  Copyright © 2020 jiasong. All rights reserved.
//

#import "RCTRefreshLayoutManager.h"
#import "RCTRefreshLayout.h"

@implementation RCTRefreshLayoutManager

RCT_EXPORT_MODULE()

- (UIView *)view {
    return [[RCTRefreshLayout alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(refreshing, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChangeState, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onChangeOffset, RCTDirectEventBlock)

@end
