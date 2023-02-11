---
layout: post
category: Note
title: 2016W5嵌入式系統實作-課程筆記
tags: [Embedded system, c, Linux, Preprocessor]
---

* [課程網頁](https://embedded2016.hackpad.com/Mar-22-2016-Mar-22-2016--CH64GFFiviW)

`*a` : value of a
`&a` : address of a

~~~ c
#include <stdio.h>
#include <stdlib.h>


/* forward declaration */

typedef struct object Object;
typedef int (*func_t)(Object *);

struct object {
        int a, b;
        func_t add, sub;
};

static int add_impl(Object *self) { return self->a + self->b; }
static int sub_impl(Object *self) { return self->a - self->b; }


int init_object(Object **self)

{
        if (NULL == (*self = malloc(sizeof(Object)))) return -1;
        (*self)->a = 0; (*self)->b = 0;
        (*self)->add = add_impl; (*self)->sub = sub_impl;

        return 0;
}

int main(int argc, char *argv[])

{
        Object *o = NULL;
        init_object(&o);
        o->a = 9922; o->b = 5566;
        printf("add = %d, sub = %d\n", o->add(o), o->sub(o));
        return 0;
}
~~~

* size_t, pid_t, xxx_t: 代表有限制的，可計算的型態。 
* C語言中沒有真正的array
  ex:
  int arr[1];
  arr[-100] = 1; #合法操作

  `[]` 只是operator而已，subscript operator
  即 arr[N] = *(arr+N)
* C function只有一種`return value`，其為純量，但該純量可以是pointer to function, or pointer to
    struct.

~~~ c
typedef int (*func_t)(Object *);
~~~

## Stringfication and concatenation

* [Stringification(字串化)](https://gcc.gnu.org/onlinedocs/cpp/Stringification.html)
* [concatenation(連結，接續)](https://gcc.gnu.org/onlinedocs/cpp/Concatenation.html) 
* [C preprocessor](http://wen00072-blog.logdown.com/posts/146624-talk-about-c-macros#目錄)

考慮以下MACRO -`object.h`

~~~ c
#ifndef __RAY_OBJECTS_H
#define __RAY_OBJECTS_H

#define DECLARE_OBJECT(name) \
    struct __##name##_node; \
    typedef struct __##name##_node *name##_node; \
    struct __##name##_node { \
        name element; \
        name##_node next; \
    }; \
    void append_##name(const name *X, name##_node *list); \
    void delete_##name##_list(name##_node *list);

DECLARE_OBJECT(light)
DECLARE_OBJECT(rectangular)
DECLARE_OBJECT(sphere)

#undef DECLARE_OBJECT

#endif
~~~
`light`在`DECLARE_OBJECT(light)`中會取代name,故會產生以下

~~~ c
struct __light_node; typedef struct __light_node *light_node; struct __light_node { light element; light_node next; }; void append_light(const light *X, light_node *list); void delete_light_list(light_node *list);
~~~

故對`object.c`前處理後(`gcc -E -P source.c`)

~~~ c
struct __light_node; typedef struct __light_node *light_node; struct __light_node { light element; light_node next; }; void append_light(const light *X, light_node *list); void delete_light_list(light_node *list);
struct __rectangular_node; typedef struct __rectangular_node *rectangular_node; struct __rectangular_node { rectangular element; rectangular_node next; }; void append_rectangular(const rectangular *X, rectangular_node *list); void delete_rectangular_list(rectangular_node *list);
struct __sphere_node; typedef struct __sphere_node *sphere_node; struct __sphere_node { sphere element; sphere_node next; }; void append_sphere(const sphere *X, sphere_node *list); void delete_sphere_list(sphere_node *list);
~~~

